import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AnalysisService } from './analysis.service';
import { TechStackAnalysisDto } from './dto/index-analysis.dto';

@ApiTags('분석')
@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Get('tech-stack-demand-supply')
  @ApiOperation({ summary: '기술스택 수요/공급 분석' })
  @ApiResponse({
    status: 200,
    description: '기술스택 수요/공급 데이터 조회 성공',
    type: TechStackAnalysisDto,
  })
  async indexTechStackDemandSupply(): Promise<TechStackAnalysisDto> {
    return await this.analysisService.getTechStackDemandSupply();
  }
}
