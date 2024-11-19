import { useEffect, useState } from "react";
import type { Dispatch } from "react";

export interface Question {
	_id: string;
	question: string;
	answer: string;
	badAnswers: string[];
	category: string;
	difficulty: "facile" | "normal" | "difficile";
	quiz: string;
}

const Themedif = ({
	setData,
	data,
}: { setData: Dispatch<Question[] | null>; data: Question[] | null }) => {
	const [category, setCategory] = useState<string | null>(null);
	const [difficulty, setDifficulty] = useState<string | null>(null);
	const [step, setStep] = useState(1);

	useEffect(() => {
		// Fonction pour construire l'URL filtrée avec les paramètres
		const buildApiUrl = () => {
			let url = import.meta.env.VITE_API_URL; // URL de base de l'API

			if (category) {
				url += `?category=${category}`;
			}

			if (difficulty) {
				url += category
					? `&difficulty=${difficulty}`
					: `?difficulty=${difficulty}`;
			}

			return url;
		};

		// Fonction pour récupérer les données depuis l'API
		const fetchData = async () => {
			const apiUrl = buildApiUrl();

			try {
				const response = await fetch(apiUrl);
				if (!response.ok) {
					throw new Error(`Erreur HTTP: ${response.status}`);
				}

				const result = await response.json();

				if (
					result &&
					Array.isArray(result.quizzes) &&
					result.quizzes.length > 0
				) {
					setData(result.quizzes);
				}
			} catch (error) {
				console.error(`Erreur : ${error}`);
			}
		};

		fetchData(); // Appeler fetchData dans useEffect
	}, [category, difficulty, setData]); // Ajouter category et difficulty comme dépendances
	return (
		<div>
			<h1>Quiz App</h1>

			{/* Sélecteur pour la catégorie */}
			{step === 1 && (
				<div>
					<button
						type="button"
						onSelect={(e) =>
							setCategory((e.target as HTMLButtonElement).value || null)
						}
						value={"art_litterature"}
						onClick={() => setStep(2)}
					>
						Art litterature
					</button>
					<button
						type="button"
						onSelect={(e) =>
							setCategory((e.target as HTMLButtonElement).value || null)
						}
						value={"tv_cinema"}
						onClick={() => setStep(2)}
					>
						Cinema
					</button>
					<button
						type="button"
						onSelect={(e) =>
							setCategory((e.target as HTMLButtonElement).value || null)
						}
						value={"sport"}
						onClick={() => setStep(2)}
					>
						Sport
					</button>
					<button
						type="button"
						onSelect={(e) =>
							setCategory((e.target as HTMLButtonElement).value || null)
						}
						value={"jeux_videos"}
						onClick={() => setStep(2)}
					>
						Jeux videos
					</button>
					<button
						type="button"
						onSelect={(e) =>
							setCategory((e.target as HTMLButtonElement).value || null)
						}
						value={"musique"}
						onClick={() => setStep(2)}
					>
						Musique
					</button>
				</div>
			)}

			{/* Sélecteur pour la difficulté */}
			{step === 2 && (
				<div>
					<button
						type="button"
						onSelect={(e) =>
							setCategory((e.target as HTMLButtonElement).value || null)
						}
						value={"facile"}
						onClick={() => setStep(3)}
					>
						Facile
					</button>

					<button
						type="button"
						onSelect={(e) =>
							setCategory((e.target as HTMLButtonElement).value || null)
						}
						value={"normal"}
						onClick={() => setStep(3)}
					>
						Normal
					</button>

					<button
						type="button"
						onSelect={(e) =>
							setCategory((e.target as HTMLButtonElement).value || null)
						}
						value={"difficile"}
						onClick={() => setStep(3)}
					>
						Difficile
					</button>
					<button type="button" onClick={() => setStep(1)}>
						Previous
					</button>
				</div>
			)}

			{/* Affiche des questions */}
		</div>
	);
};

export default Themedif;
