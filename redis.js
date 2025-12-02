import { createClient } from 'redis';

const client = createClient();

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

await client.set('name', 'Abhay');
const value = await client.get('name');
console.log(value);

// Increment counter
await client.set('counter', 0);
await client.incr('counter');
console.log(await client.get('counter'));  // '1'

// List operations (queue)
await client.rPush('tasks', 'task1');
await client.rPush('tasks', 'task2');
const task = await client.lPop('tasks');
console.log(task);  // 'task1'

// Key with expiration (10 seconds)
await client.set('temp', 'value', { EX: 10 });


await client.quit();
