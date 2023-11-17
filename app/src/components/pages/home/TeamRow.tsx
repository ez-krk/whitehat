import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import type { NewsIndex } from '@/types/article'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faXTwitter } from '@fortawesome/free-brands-svg-icons'

type Props = {
  articles: NewsIndex[]
  urls: string[]
}

export default function TeamRow({ articles, urls }: Props) {
  const { t } = useTranslation()

  const members = [
    {
      name: '€$¥',
      role: 'co-founder',
      description:
        'rust enthusiast and solana maximalist writing code all day long, whitehat and feedback provider.',
      x: '@ez-krk',
      github: 'ez-krk',
    },
    {
      name: 'nate',
      role: 'co-founder',
      description:
        'professional blockchain defi strategist & researcher. advisor for concordia, superp dao, ambit, ecplisepad and more',
      x: '@qubitn8',
      github: 'bitn8',
    },
    {
      name: 'dean',
      role: 'tech advisor',
      description:
        'senior blockchain engineer with almost 2 decades of professional engineering experience, and 5 + years working with rust.',
      x: '@deanmlittle',
      github: 'deanmlittle',
    },
    {
      name: 'richard',
      role: 'tech advisor',
      description:
        'elite rust developer in web2 and web3, working across multiple ecosystems as builder & founder.',
      x: '@ivmidable',
      github: 'ivmidable',
    },
    {
      name: 'jeff',
      role: 'business advisor',
      description:
        'professional educator and curriculum designer of 30 years turned hacker & web3 evangelist.',
      x: '@japarjam',
      github: 'japarjam',
    },
    {
      name: 'leo',
      role: 'business advisor',
      description:
        'senior blockchain engineer with almost 2 decades of professional engineering experience, and 5 + years working with rust.',
      x: '@l0ste_',
      github: '',
    },
  ]

  return (
    <>
      <div className="pb-24 pt-8 sm:pb-48 sm:pt-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto w-full text-center">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl">
              meet the team
            </h2>
          </div>
          <div className="mx-auto mt-8 grid w-full max-w-2xl grid-cols-1 gap-x-8 gap-y-2 md:grid-cols-3 lg:mx-0 lg:max-w-none">
            {members.map((member, index) => (
              <article
                key={`NewsIndex Article${index}`}
                className="group flex w-full flex-col items-center justify-center border border-black bg-gray-900 dark:bg-gray-50"
              >
                <div className="w-full">
                  <div className="relative w-[100%] p-4">
                    <div className="flex w-[100%] items-center justify-center">
                      <div className="avatar mx-auto">
                        <div className="w-16 rounded-full border-2 border-gray-50 bg-gray-50 text-neutral-content dark:border-gray-900">
                          <Image
                            src={`/images/avatars/${member.name}.png`}
                            width={100}
                            height={100}
                            alt={`${member.name}`}
                          />
                        </div>
                      </div>
                    </div>

                    <h2 className="my-1.5 w-[100%] text-center text-lg font-semibold leading-6 text-gray-50 dark:text-gray-900">
                      <span className="absolute inset-0" />
                      {member.name}
                    </h2>
                    <p className="mb-4 mt-1.5 w-full flex-grow text-xs text-gray-50 dark:text-gray-900">
                      {`${member.description}`}
                    </p>
                    <div className="flex w-[100%] items-center justify-center border-t border-gray-50 p-1.5 pt-4 dark:border-gray-900">
                      <div
                        className={`w-36 rounded-sm bg-gray-50 text-center text-xs text-gray-900 dark:bg-gray-900 dark:text-gray-50`}
                      >
                        {member.role}
                      </div>
                      <div className="flex w-[100%] items-center justify-end space-x-2">
                        <Link
                          href={`https://x.com/${member.x}`}
                          target="_blank"
                          rel="noreferrer"
                          className="z-[999]"
                        >
                          <FontAwesomeIcon
                            icon={faXTwitter}
                            size="sm"
                            aria-label="Twitter icon"
                            className="z-[999] h-5 w-5 text-gray-50 dark:text-gray-900"
                          />
                        </Link>
                        {member.github && (
                          <Link
                            href={`https://github.com/${member.github}`}
                            target="_blank"
                            rel="noreferrer"
                            className="z-[999]"
                          >
                            <FontAwesomeIcon
                              icon={faGithub}
                              size="sm"
                              aria-label="GitHub icon"
                              className="z-[999] h-5 w-5 text-gray-50 dark:text-gray-900"
                            />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
            <div className="mx-auto w-full max-w-2xl border-t border-gray-900/10 pt-4 sm:pt-4 lg:mx-0 lg:max-w-none lg:border-t-0 lg:pt-0">
              <div className="-my-4 divide-y divide-gray-900/10">
                {articles.map((article, index) => (
                  <article
                    key={`NewsIndex Article${article.title}`}
                    className="py-4"
                  >
                    <Link href={urls[index + 1]}>
                      <div className="group relative flex gap-x-6">
                        <Image
                          src={article.thumbnail}
                          alt={article.title}
                          width="160"
                          height="90"
                          className="hidden aspect-video bg-gray-50 object-cover group-hover:opacity-80 dark:bg-gray-800 sm:block"
                          unoptimized
                        />
                        <div className="max-w-xl">
                          <div className="flex items-center gap-x-4 text-xs">
                            <span className="relative bg-gray-600 px-3 py-1.5 font-medium text-white group-hover:bg-gray-400 dark:bg-gray-400  dark:text-gray-50 dark:group-hover:bg-gray-700">
                              {article.category}
                            </span>
                          </div>
                          <h2 className="mt-2 text-lg font-semibold text-gray-900 group-hover:text-gray-600 dark:text-gray-50 dark:group-hover:text-gray-300">
                            <span className="absolute inset-0" />
                            {article.title}
                          </h2>
                          <p className="mt-4 text-sm leading-6 text-gray-600 group-hover:text-gray-400 dark:text-gray-300 dark:group-hover:text-gray-500">
                            {`${article.content}`}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
