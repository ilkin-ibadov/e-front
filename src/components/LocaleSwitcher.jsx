'use client';

import { useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { setUserLocale } from '../utils/locale';

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher")
  const items =
    [
      {
        value: 'en',
        label: t('en')
      },
      {
        value: 'az',
        label: t('az')
      }
    ]

  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  function onSelectChange(value) {
    startTransition(() => {
      console.log(value)
      setUserLocale(value);
    });
  }

  return (
    <div>
      <p className="text-white mb-2">{t("chooseLanguage")}</p>
      <div className='border border-zinc-300 rounded-lg mb-4'>
        <select
          className="focus:outline-none appearance-none bg-transparent p-3 text-white"
          defaultValue={locale}
          disabled={isPending}
          onChange={(e) => {
            onSelectChange(e.target.value)
          }}
        >
          {items.map((item) => (
            <option className='text-black' key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
