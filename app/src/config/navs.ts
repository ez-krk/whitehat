import {
  AcademicCapIcon,
  BookOpenIcon,
  BugAntIcon,
  ChatBubbleLeftRightIcon,
  CheckBadgeIcon,
  CheckCircleIcon,
  Cog8ToothIcon,
  CommandLineIcon,
  CpuChipIcon,
  CurrencyDollarIcon,
  EyeSlashIcon,
  HeartIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  PresentationChartLineIcon,
  ReceiptPercentIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
  UserPlusIcon,
  WrenchScrewdriverIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline'

export const defaultMainNav = [
  {
    name: 'navs.defaultMainNav.home',
    href: '/',
  },
  // {
  //   name: 'navs.defaultMainNav.news',
  //   href: '/news/',
  // },
  {
    name: 'navs.defaultMainNav.scout',
    href: '/scout/',
  },
  {
    name: 'navs.defaultMainNav.docs',
    href: '/docs/',
  },
]

export const commonFooterNav = [
  {
    name: 'navs.defaultMainNav.home',
    href: '/',
  },
  // {
  //   name: 'navs.commonFooterNav.news',
  //   href: '/news/',
  // },
  {
    name: 'navs.defaultMainNav.scout',
    href: '/scout/',
  },
  {
    name: 'navs.commonFooterNav.docs',
    href: '/docs/',
  },
  {
    name: 'navs.commonFooterNav.privacy',
    href: '/legal/privacy-policy/',
  },
]

export const docMenuNav = [
  { name: 'docs:menuNav.home', href: '/docs/', icon: HomeIcon },
  {
    name: 'docs:menuNav.general.groupTitle',
    children: [
      {
        name: 'docs:menuNav.general.docsStatus',
        href: '/docs/general/docs-status/',
        icon: AcademicCapIcon,
      },
      {
        name: 'docs:menuNav.general.motivation',
        href: '/docs/general/motivation/',
        icon: HeartIcon,
      },
      {
        name: 'docs:menuNav.general.quickstart',
        href: '/docs/general/quickstart/',
        icon: RocketLaunchIcon,
      },
      {
        name: 'docs:menuNav.general.revenueModel',
        href: '/docs/general/revenue-model/',
        icon: ReceiptPercentIcon,
      },
      {
        name: 'docs:menuNav.general.legalDischarge',
        href: '/docs/general/legal-discharge/',
        icon: CheckBadgeIcon,
      },
      // {
      //   name: 'docs:menuNav.general.readme',
      //   href: '/docs/general/readme/',
      //   icon: BookOpenIcon,
      // },
    ],
  },
  {
    name: 'docs:menuNav.protocol.groupTitle',
    children: [
      {
        name: 'docs:menuNav.protocol.register',
        href: '/docs/protocol/register/',
        icon: UserPlusIcon,
      },
      {
        name: 'docs:menuNav.protocol.addProgram',
        href: '/docs/protocol/add-program/',
        icon: CpuChipIcon,
      },
      {
        name: 'docs:menuNav.protocol.approve',
        href: '/docs/protocol/approve/',
        icon: CheckCircleIcon,
      },
      {
        name: 'docs:menuNav.protocol.dispute',
        href: '/docs/protocol/dispute/',
        icon: XCircleIcon,
      },
    ],
  },
  {
    name: 'docs:menuNav.whitehat.groupTitle',
    children: [
      {
        name: 'docs:menuNav.whitehat.scout',
        href: '/docs/whitehat/scout/',
        icon: MagnifyingGlassIcon,
      },
      {
        name: 'docs:menuNav.whitehat.payout',
        href: '/docs/whitehat/payout/',
        icon: CurrencyDollarIcon,
      },
      {
        name: 'docs:menuNav.whitehat.vulnerability',
        href: '/docs/whitehat/vulnerability/',
        icon: BugAntIcon,
      },
      {
        name: 'docs:menuNav.whitehat.exploit',
        href: '/docs/whitehat/exploit/',
        icon: CommandLineIcon,
      },
    ],
  },
  {
    name: 'docs:menuNav.toolbox.groupTitle',
    children: [
      {
        name: 'docs:menuNav.toolbox.cli',
        href: '/docs/toolbox/command-line-interface/',
        icon: CommandLineIcon,
      },
      {
        name: 'docs:menuNav.toolbox.tooling',
        href: '/docs/toolbox/recommended-tools/',
        icon: WrenchScrewdriverIcon,
      },
    ],
  },
]

export const docHeaderNav = [
  {
    name: 'docs:headerNav.home',
    href: '/',
  },
  // {
  //   name: 'docs:headerNav.news',
  //   href: '/news/',
  // },
]

export const userMenuNav = [
  {
    name: 'user:menuNav.dashboard',
    href: '/dashboard/',
    icon: PresentationChartLineIcon,
  },
  {
    name: 'user:menuNav.reports',
    href: '/reports/',
    icon: ShieldExclamationIcon,
  },
  {
    name: 'user:menuNav.hacks',
    href: '/hacks/',
    icon: CommandLineIcon,
  },
  // {
  //   name: 'user:menuNav.inbox',
  //   href: '/inbox/',
  //   icon: PaperAirplaneIcon,
  // },
  // {
  //   name: 'user:menuNav.settings',
  //   href: '/settings/',
  //   icon: Cog8ToothIcon,
  // },
]

export const userHeaderNav = [
  {
    name: 'user:headerNav.settings',
    href: '/settings/',
  },
]
