import faker from 'faker';

export const getInitialData = (count: 5) => {
  const tasks = {};
  const columns = {};
  for (let index = 0; index < 5; index++) {
    const taskItem = {
      id: `task-${index}`,
      content: faker.random.word()
    };
    tasks[`task-${index}`] = taskItem;
  }
  const taskIds = Object.keys(tasks);

  for (let index = 0; index < 1; index++) {
    const columnItem = {
      id: `column-${index}`,
      title: `Column-${index}`,
      taskIds
    };
    columns[`column-${index}`] = columnItem;
  }
  const columnsOrder = Object.keys(columns);

  return {
    tasks,
    columns,
    columnsOrder
  };
};
