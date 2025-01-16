const useNumberFormatter = (locale = 'sr-RS', options = {}) => {
    const defaultOptions = {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    };

    const formatter = new Intl.NumberFormat(locale, { ...defaultOptions, ...options });

    return (number: number) => formatter.format(number);
};

export default useNumberFormatter;
