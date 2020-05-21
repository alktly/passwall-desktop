import Vue from 'vue'

import {
  LogoutIcon,
  StarIcon,
  LockClosedIcon,
  ClipboardCheckIcon,
  CreditCardIcon,
  UserIcon,
  TrashIcon,
  ExternalLinkIcon,
  CheveronRightIcon,
  ShareIcon,
  ClipboardCopyIcon,
  PencilIcon,
  DuplicateIcon,
  EyeIcon,
  EyeOffIcon
} from '@vue-hero-icons/solid'
Vue.component(LogoutIcon.name, LogoutIcon)
Vue.component(StarIcon.name, StarIcon)
Vue.component(LockClosedIcon.name, LockClosedIcon)
Vue.component(ClipboardCheckIcon.name, ClipboardCheckIcon)
Vue.component(CreditCardIcon.name, CreditCardIcon)
Vue.component(UserIcon.name, UserIcon)
Vue.component(TrashIcon.name, TrashIcon)
Vue.component(ExternalLinkIcon.name, ExternalLinkIcon)
Vue.component(CheveronRightIcon.name, CheveronRightIcon)
Vue.component(ShareIcon.name, ShareIcon)
Vue.component(ClipboardCopyIcon.name, ClipboardCopyIcon)
Vue.component(DuplicateIcon.name, DuplicateIcon)
Vue.component(PencilIcon.name, PencilIcon)
Vue.component(EyeIcon.name, EyeIcon)
Vue.component(EyeOffIcon.name, EyeOffIcon)

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import VuePerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
Vue.use(VuePerfectScrollbar)

import VeeValidate from 'vee-validate'
Vue.use(VeeValidate, { events: 'input|blur' })

import VTooltip from 'v-tooltip'
Vue.use(VTooltip)

// Auto register all components
const requireComponent = require.context('./components', true, /\.(vue)$/)
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  Vue.component(componentConfig.default.name, () =>
    import(`@/components/${fileName.replace('./', '')}`)
  )
})
