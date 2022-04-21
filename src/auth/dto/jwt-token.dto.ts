import { ApiProperty } from '@nestjs/swagger';

export class JWTTokenDto {
  @ApiProperty({
    description: 'JWT Access Token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRzYWkgSm9zaCIsInN1YiI6MSwiaWF0IjoxNjUwNTEyNTk4LCJleHAiOjE2NTA1MzQxOTh9.VaymVuFEpDtFW8KWT6dFfy-FuaFX9l6hBBR_-7YfYUw',
    required: true,
  })
  public access_token: string;
}
