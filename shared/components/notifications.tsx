import { BellDot } from 'lucide-react'
// import { useSession } from 'next-auth/react'
import React from 'react'

interface Props {
	className?: string
}

export const Notifications: React.FC<Props> = ({ className }) => {
	// const { data: session } = useSession()

	return <BellDot className='hover:text-blue-700 cursor-pointer' />
}
