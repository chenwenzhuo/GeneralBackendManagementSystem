import { Request, Response } from 'express';
import { ApiResponse } from '../types';

export const healthCheck = (_req: Request, res: Response): void => {
  const response: ApiResponse = {
    success: true,
    data: {
      message: 'Welcome to General Backend Management System',
      version: '1.0.0',
      status: 'running',
      timestamp: new Date().toISOString(),
    },
  };
  res.json(response);
};

export const getApiInfo = (_req: Request, res: Response): void => {
  const response: ApiResponse = {
    success: true,
    data: {
      name: 'General Backend Management System API',
      version: '1.0.0',
      endpoints: [
        { method: 'GET', path: '/', description: 'Health check' },
        { method: 'GET', path: '/api/info', description: 'API information' },
      ],
    },
  };
  res.json(response);
};
