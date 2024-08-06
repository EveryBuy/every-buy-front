type MediaQueries = {
	isMobile: string,
	isTablet: string,
	isLaptop: string,
	isDesktop: string 
};

type MatchedMediaResult = { [K in keyof MediaQueries]: boolean };