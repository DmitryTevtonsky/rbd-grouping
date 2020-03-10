import faker from 'faker';

export const getInitialData = (count: 3) => {
  const tasks = {};
  const columns = {};
  for (let index = 0; index < 4; index++) {
    const taskItem = {
      id: `task-${index}`,
      content: faker.random.word()
    };
    tasks[`task-${index}`] = taskItem;
  }

  for (let index = 0; index < 3; index++) {
    // const taskIds = Object.keys(tasks);
    const taskIdsForThisColumn = Object.keys(tasks).splice(index * 3, 3);
    // console.log(taskIdsForThisColumn);
    const columnItem = {
      id: `column-${index}`,
      title: `Column-${index}`,
      taskIds: taskIdsForThisColumn
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
