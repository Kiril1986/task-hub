export const taskStatuses = ['All', 'Done', 'In progress', 'Upcoming'] as const;
export type TaskStatus = (typeof taskStatuses)[number];