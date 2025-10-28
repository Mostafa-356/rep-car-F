
export enum NotificationType {
  Success = 'SUCCESS',
  Error = 'ERROR',
  Info = 'INFO',
}

export interface Notification {
  id: number;
  type: NotificationType;
  message: string;
}

export interface DiagnosticResult {
  possible_causes: string[];
  recommended_actions: string[];
  severity_level: 'Low' | 'Medium' | 'High';
}

export interface MaintenanceTask {
  task_name: string;
  interval_miles: number;
  description: string;
}

export interface MaintenanceScheduleResult {
  schedule: MaintenanceTask[];
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}