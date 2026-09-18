// scripts/test-lib-directus.ts
import { getVehicles, getShowrooms, getUsedCars, getChargers, getPosts } from '../lib/directus';

async function test() {
  console.log('Testing lib/directus fetchers:');
  const v = await getVehicles();
  console.log('✔ Vehicles:', v.length, '| Sample:', v[0]?.name, '| Thumb:', v[0]?.thumbnail);

  const sr = await getShowrooms();
  console.log('✔ Showrooms:', sr.length, '| Sample:', sr[0]?.name);

  const uc = await getUsedCars();
  console.log('✔ Used cars:', uc.length, '| Sample:', uc[0]?.name);

  const ch = await getChargers();
  console.log('✔ Chargers:', ch.length, '| Sample:', ch[0]?.name);

  const p = await getPosts();
  console.log('✔ Posts:', p.length, '| Sample:', p[0]?.title);
}

test().catch(console.error);
