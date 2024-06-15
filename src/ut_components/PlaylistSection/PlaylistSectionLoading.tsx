import './PlaylistSection.scss'

const PlaylistSectionLoading = () => {
	return (
		<div className="playlist__section">
			<div className="playlist__section_title skeleton"></div>

			<div className="playlist__section_items">
				{Array(5)
					.fill(null)
					.map((item, key) => (
						<div key={key} className="playlist__card">
							<div className="playlist__card_img skeleton"></div>
							<div className="playlist__card_content">
								<div className="playlist__card_title skeleton"></div>
							</div>
						</div>
					))}
			</div>
		</div>
	)
}

export default PlaylistSectionLoading
