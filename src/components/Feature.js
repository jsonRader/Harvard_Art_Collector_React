import React from 'react';
import {fetchQueryResultsFromTermAndValue} from '../api';

const Searchable = ({searchTerm, searchValue, setIsLoading, setSearchResults}) => {
	return (
		<span className="content">
			<a href="#" onClick={async (event) => {
				event.preventDefault();
				setIsLoading(true);
				try {
					let results = await fetchQueryResultsFromTermAndValue(searchTerm, searchValue);
					setSearchResults(results)
				} catch (error) {
					console.error(error);
				} finally {
					setIsLoading(false)
				}
			}}>{searchTerm}</a>
		</span>
	)
}

const Feature = (props) => {
	const { featuredResult } = props;
	return (featuredResult)
		? <>
			<main id="feature">
				<div className="object-feature">
					<header>
						<h3>{featuredResult.title}</h3>
						<h4>{featuredResult.dated}</h4>
					</header>
					<section className="facts">
						<span className="title">{featuredResult.description}</span>
						<span className="content"> STYLE: {featuredResult.style}</span>
						<span className="content"> DIMENSIONS: {featuredResult.dimensions}</span>
						<span className="content">{featuredResult.division}</span>
						<span className="content"> CONTACT: {featuredResult.contact}</span>
						<span className="content"> CREDIT: {featuredResult.creditline}</span>
						<>
							<span className="content"> CULTURE: <Searchable
								searchTerm={featuredResult.culture}
								searchValue={featuredResult.culture}
								{...props} />
							</span>
						</>
						<>
							<span className="content"> TECHNIQUE: <Searchable
								searchTerm={featuredResult.technique}
								searchValue={featuredResult.technique}
								{...props} />
							</span>
						</>
						<>
							<span className="content"> MEDIUM: <Searchable
								searchTerm={featuredResult.medium}
								searchValue={featuredResult.medium}
								{...props} />
							</span>
						</>
						<>
							<span className="content"> PEOPLE(S):
								{featuredResult.people
									? featuredResult.people.map((person, index) => {
										return <span
											key={`${person} ${index}`}
											className="content">
											<Searchable
												searchTerm={featuredResult.people.displayname}
												searchValue={featuredResult.people.displayname}
												{...props}

												{...featuredResult.people.displayname
													? featuredResult.people.displayname
													: null
												}
											/> </span>
									})
									: null}
							</span>
						</>
					</section>
					<section className="photos">
						{featuredResult.images
							? featuredResult.images.map((primaryimageurl, index) => {
								return <div
									key={`${primaryimageurl} ${index}`}
									className="photos">
									{featuredResult.primaryimageurl
										? <img src={featuredResult.primaryimageurl} alt={featuredResult.description} />
										: null}
								</div>
							})
							: null}
					</section>
				</div>
			</main>
		</> : <main id="feature"></main>
}

export default Feature;