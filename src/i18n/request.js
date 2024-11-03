import {getRequestConfig} from 'next-intl/server';
import { cookies } from 'next/headers'
 
export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const cookieStore = await cookies()
  const locale = cookieStore.get('NEXT_LOCALE')?.value || "az"
  // const locale3 = getCookie("NEXT_LOCALE");
  
 
  // if(locale){
  //   return {
  //     locale,
  //     messages: (await import(`../../messages/${locale}.json`)).default
  //   };
  // }

  // const locale = "az"

  return {
        locale,
        messages: (await import(`../../messages/${locale}.json`)).default
      };
});