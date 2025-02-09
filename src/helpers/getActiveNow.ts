function isActiveNow<T>({ agent }: { agent: T }): boolean {
  const now = new Date();
  const actualHour = now.getHours();
  const actualMinutes = now.getMinutes();

  // @ts-ignore
  const [startHour, startMinutes] = agent.startWorkingTime.split(':').map(Number);
  // @ts-ignore
  const [finalHour, finalMinutes] = agent.endWorkingTime.split(':').map(Number);

  const minutesHourInit = startHour * 60 + startMinutes;
  const minutesHourEnd = finalHour * 60 + finalMinutes;
  const minutesHourActual = actualHour * 60 + actualMinutes;
  // @ts-ignore
  return minutesHourActual >= minutesHourInit && minutesHourActual <= minutesHourEnd && agent.assigned === false;
}

export { isActiveNow };
