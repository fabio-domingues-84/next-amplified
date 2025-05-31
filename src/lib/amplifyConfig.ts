'use client'

import { Amplify } from 'aws-amplify'
import config from '@/amplifyconfiguration.json'

export default function AmplifyConfig() {
    Amplify.configure(config, { ssr: true })

    return null
}