// scripts/test-lib-directus.ts
import { getVehicles, getShowrooms, getUsedCars, getChargers, getPosts, getBanners } from '../lib/directus';

async function test() {
  console.log('Testing lib/directus fetchers:');
  const v = await getVehicles();
  console.log('✔ Vehicles:', v.length, '| Sample:', v[0]?.name, '| Thumb:', v[0]?.thumbnail);

  const sr = await getShowrooms();
  console.log('✔ Showrooms:', sr.length, '| Sample:', sr[0]?.name, '| Img:', sr[0]?.image);

  const uc = await getUsedCars();
  console.log('✔ Used cars:', uc.length, '| Sample:', uc[0]?.name, '| Img:', uc[0]?.image);

  const ch = await getChargers();
  console.log('✔ Chargers:', ch.length, '| Sample:', ch[0]?.name);

  const p = await getPosts();
  console.log('✔ Posts:', p.length, '| Sample:', p[0]?.title, '| Thumb:', p[0]?.thumbnail);

  const bn = await getBanners('hero');
  console.log('✔ Hero Banners:', bn.length, '| Sample:', bn[0]?.title, '| Img:', bn[0]?.image);
}

test().catch(console.error);
