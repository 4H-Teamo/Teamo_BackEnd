import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { handlePrismaError } from '../shared/validators/prisma/prisma.exception';
import { StackData, TechStackAnalysis } from './interface/analysis.interfaces';

@Injectable()
export class AnalysisService {
  constructor(private prisma: PrismaService) {}

  async getTechStackDemandSupply(): Promise<TechStackAnalysis> {
    try {
      // Stack 정보 조회
      const stacks = await this.prisma.stack.findMany({
        select: { stackId: true, name: true },
      });

      // console.log('Available stacks:', stacks);

      // stacks를 문자열로 조회해서 애플리케이션에서 파싱
      const users = await this.prisma.$queryRaw<{ stacks: string }[]>`
        SELECT stacks::text as stacks
        FROM "User" 
        WHERE is_public = true AND stacks IS NOT NULL
      `;

      const posts = await this.prisma.$queryRaw<{ stacks: string }[]>`
        SELECT stacks::text as stacks
        FROM "Post" 
        WHERE status = true AND stacks IS NOT NULL
      `;

      // 공급(유저가 정보에 등록한 기술)
      const supplyCount = new Map<number, number>();
      users.forEach((user) => {
        try {
          let stackArray: number[] = [];

          // PostgreSQL 배열 형태 {1,2,3} 파싱
          if (user.stacks.startsWith('{') && user.stacks.endsWith('}')) {
            const stackStr = user.stacks.slice(1, -1); // {} 제거
            if (stackStr.trim()) {
              stackArray = stackStr
                .split(',')
                .map((s) => parseInt(s.trim()))
                .filter((n) => !isNaN(n));
            }
          } else {
            // JSON 형태 [1,2,3] 파싱 시도
            stackArray = JSON.parse(user.stacks) as number[];
          }

          if (Array.isArray(stackArray)) {
            stackArray.forEach((stackId) => {
              if (typeof stackId === 'number' && !isNaN(stackId)) {
                supplyCount.set(stackId, (supplyCount.get(stackId) || 0) + 1);
              }
            });
          }
        } catch {
          console.warn('Failed to parse user stacks:', user.stacks);
        }
      });

      // 수요(게시글에서 요구하는 기술)
      const demandCount = new Map<number, number>();
      posts.forEach((post) => {
        try {
          let stackArray: number[] = [];

          // PostgreSQL 배열 형태 {1,2,3} 파싱
          if (post.stacks.startsWith('{') && post.stacks.endsWith('}')) {
            const stackStr = post.stacks.slice(1, -1); // {} 제거
            if (stackStr.trim()) {
              stackArray = stackStr
                .split(',')
                .map((s) => parseInt(s.trim()))
                .filter((n) => !isNaN(n));
            }
          } else {
            // JSON 형태 [1,2,3] 파싱 시도
            stackArray = JSON.parse(post.stacks) as number[];
          }

          if (Array.isArray(stackArray)) {
            stackArray.forEach((stackId) => {
              if (typeof stackId === 'number' && !isNaN(stackId)) {
                demandCount.set(stackId, (demandCount.get(stackId) || 0) + 1);
              }
            });
          }
        } catch {
          console.warn('Failed to parse post stacks:', post.stacks);
        }
      });

      // Stack 이름 매핑
      const stackMap = new Map(
        stacks.map((stack) => [stack.stackId, stack.name]),
      );

      const supply: StackData[] = Array.from(supplyCount.entries())
        .map(([stackId, count]) => ({
          stackId,
          stackName: stackMap.get(stackId) || 'Unknown',
          count,
        }))
        .sort((a, b) => b.count - a.count);

      const demand: StackData[] = Array.from(demandCount.entries())
        .map(([stackId, count]) => ({
          stackId,
          stackName: stackMap.get(stackId) || 'Unknown',
          count,
        }))
        .sort((a, b) => b.count - a.count);

      return {
        supply,
        demand,
      };
    } catch (error) {
      console.error('Error in getTechStackDemandSupply:', error);
      handlePrismaError(error);
    }
  }
}
