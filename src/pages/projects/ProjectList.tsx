import {Box} from "@mui/material";
import {useForm} from "react-hook-form";
import ContentCard from "../../components/layout/ContentCard.tsx";
import PageHeader from "../../components/text/PageHeader.tsx";

const ProjectList = () => {
    const { control, reset, handleSubmit, setValue } = useForm({
        defaultValues: {
            taskIdIn: [],
            onlyActives: false,
        },
    });

    const onSubmit = handleSubmit((data) => {});

    const onReset = () => {
        reset();
        onSubmit();
    };

    return (
        <Box>
            <PageHeader text={'Projektek'}/>
            <ContentCard>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                        <form autoComplete="off" noValidate onSubmit={onSubmit}>
                            {/*<TextFieldInput
                                label={'NAME'}
                                control={control}
                                name="name"
                            />
                            <TextFieldInput
                                label={'POSITION'}
                                control={control}
                                name="position"
                            />*/}
                        </form>
                    </Box>
                </Box>
            </ContentCard>
            {/*<NoBackgroundCard>
                <UserTableComponent />
            </NoBackgroundCard>*/}
        </Box>
    );
};

export default ProjectList;