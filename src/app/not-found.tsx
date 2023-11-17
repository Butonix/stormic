import MainLayout from '@/components/ui/custom_layouts/main_layout/MainLayout'
import Link from 'next/link'

export default function NotFound() {
	return (
		<MainLayout>
			<div>
				<h1>Not found – 404!</h1>
				<div>
					<Link href='/'>Go back to Home</Link>
				</div>
			</div>
		</MainLayout>
	)
}
