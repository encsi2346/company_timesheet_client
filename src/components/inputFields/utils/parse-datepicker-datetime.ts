export const parseDatePickerDateTime = (date: unknown) => {
    try {
        if (date) {
            return new Date(date as string).toISOString();
        } else {
            return null;
        }
    } catch (e) {
        return null;
    }
};
