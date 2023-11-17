import {useForm} from "react-hook-form";
import {Box, Button} from "@mui/material";
import {SxProps, Theme} from "@mui/material";
import ContentCard from "../../components/layout/ContentCard.tsx";
import MyPlannerFilter from "./MyPlannerFilter.tsx";
import {useTypeSafeTranslation} from "../../components/inputFields/hooks/useTypeSafeTranslation.tsx";
import {useModal} from "@ebay/nice-modal-react";
import AddPlanDialog from "./AddPlanDialog.tsx";

const saveTitleStyle: SxProps<Theme> = {
    fontWeight: 'regular',
    fontSize: '14px',
    color: '#ffffff',
    backgroundColor: '#29005C',
    borderRadius: '13px',
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '20px',
    marginBottom: '20px',
    paddingTop: '8px',
    paddingBottom: '8px',
    paddingLeft: '30px',
    paddingRight: '30px',
    textTransform: 'none',
}

const MyPlanner = () => {
    const { t } = useTypeSafeTranslation();
    const addPlanDialog = useModal(AddPlanDialog);

    const { setValue } = useForm({
        defaultValues: {
            taskIdIn: [],
            onlyActives: false,
        },
    });

    const openAddPlanDialog = () => {
        addPlanDialog
            .show({
                title: t('TEXT.LOG_TIME'),
                acceptText: t('TEXT.SAVE'),
            })
            .then((value) => {
                setValue('logs', value as string[]);
            })
            .catch(() => null);
    };

    return (
        <Box>
            <Box sx={{ display: 'flex'}}>
                <MyPlannerFilter />
            </Box>

            <ContentCard>
                <Button sx={saveTitleStyle} onClick={openAddPlanDialog}>
                    {t('TEXT.ADD_LOG')}
                </Button>
            </ContentCard>
        </Box>
    );
};


export default MyPlanner;