import { Work } from '@typings';
import faker from 'faker';

const fakeWorks: Work[] = [...Array(15)].map<Work>(() => ({
  id: faker.datatype.number(),
  userId: faker.datatype.number(),
  origin: faker.address.streetAddress(),
  waypoint: faker.address.streetAddress(),
  destination: faker.address.streetAddress(),
  carModel: faker.vehicle.type(),
  charge: ~~(Math.random() * 1000),
  subsidy: ~~(Math.random() * 1000),
  remark: faker.lorem.text(),
  checkTime: new Date(Date.now() - faker.datatype.number() * 200),
  endTime: new Date(Date.now() - faker.datatype.number() * 50),
  createdAt: new Date(Date.now() - faker.datatype.number() * 30000),
  updatedAt: new Date(Date.now() - faker.datatype.number() * 30000),
}));

export default fakeWorks;
