import faker from 'faker';

export const getInitialData = (count: 3) => {
  const serieses = {};
  const axises = {};
  for (let index = 0; index < 10; index++) {
    const taskItem = {
      id: `task-${index}`,
      content: faker.random.word()
    };
    serieses[`task-${index}`] = taskItem;
  }

  for (let index = 0; index < 6; index++) {
    // const seriesesIds = Object.keys(serieses);
    const seriesesIdsForThisAxis = Object.keys(serieses).splice(index * 1, 1);
    // console.log(seriesesIdsForThisAxis);
    const columnItem = {
      id: `axis-${index}`,
      title: `Axis-${index}`,
      seriesesIds: seriesesIdsForThisAxis
    };
    axises[`axis-${index}`] = columnItem;
  }
  const axisesOrder = Object.keys(axises);

  return {
    serieses,
    axises,
    axisesOrder
  };
};
