export const parseDatePickerDate = (date: unknown) => {
    try {
        if (date) {
            return new Date(date as string).toLocaleDateString('swe');
        } else {
            return null;
        }
    } catch (e) {
        return null;
    }
};
