export const returnResult = (
  event: string,
  status: number,
  message: string,
) => {
  return {
    event,
    data: { status, message },
  };
};
