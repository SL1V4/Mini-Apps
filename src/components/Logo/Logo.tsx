import '@/components/Logo/Logo.scss'
import LogoIcon from '@/icons/LogoIcon'

const Logo = ({ url }: { url: string }) => {
	return (
		<a href={url} className="logo">
			<LogoIcon />

			<span>Simonenko Slava</span>
		</a>
	)
}

export default Logo
