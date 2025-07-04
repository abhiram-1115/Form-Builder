import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FormsModule } from './forms/forms.module';
import { ResponsesModule } from './responses/responses.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, UsersModule, FormsModule, ResponsesModule, AnalyticsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
