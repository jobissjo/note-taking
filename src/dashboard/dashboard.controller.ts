import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@ApiTags('dashboard')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve dashboard summary data' })
  @ApiOkResponse({ 
      description: 'Returns counts and recent items for workspaces, journals, and stories' 
  })
  async getDashboard(@Request() req) {
    return this.dashboardService.getDashboardData(req.user.userId);
  }
}
