import { FC, PropsWithChildren, useEffect } from 'react'
import { createPortal } from 'react-dom'

import './Popup.scss'

interface IPopup {
	isActive: boolean
	close(): void
}

const Popup: FC<PropsWithChildren<IPopup>> = ({
	children,
	isActive = false,
	close
}) => {
	useEffect(() => {
		if (isActive) {
			return document.body.classList.add('overflow__hidden')
		}

		document.body.classList.remove('overflow__hidden')
	}, [isActive])

	return createPortal(
		<div className={'popap' + (isActive ? ' active' : '')}>
			<div className="overlay" onClick={close}></div>
			<div className="popap__content">
				<div className="close_btn" onClick={close}>
					<span></span>
				</div>

				{children}
			</div>
		</div>,
		document.body
	)
}

export default Popup
