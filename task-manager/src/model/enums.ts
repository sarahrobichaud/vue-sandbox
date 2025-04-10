export const Priority = {
    LOW: 'Not a priority',
    MEDIUM: 'Somewhat important',
    HIGH: 'Urgent',
} as const;

export type Priority = typeof Priority[keyof typeof Priority];


export const HomeView = {
  PENDING: 'pending',
  COMPLETED: 'completed'
} as const

export type HomeView = (typeof HomeView)[keyof typeof HomeView]