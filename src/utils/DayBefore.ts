export const dayBefore = () => {
	const today = new Date();

	// Si c'est lundi (1), on retourne le vendredi précédent (-3 jours)
	if (today.getDay() === 1) {
		const friday = new Date(today.setDate(today.getDate() - 3));
		return friday.toISOString().split("T")[0];
	}

	// Sinon on retourne la veille (-1 jour)
	const yesterday = new Date(today.setDate(today.getDate() - 1));
	return yesterday.toISOString().split("T")[0];
};
