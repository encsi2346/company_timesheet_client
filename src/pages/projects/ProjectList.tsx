import {Box} from "@mui/material";
import {useForm} from "react-hook-form";
import ContentCard from "../../components/layout/ContentCard.tsx";
import PageHeader from "../../components/text/PageHeader.tsx";
import AddButton from "../../components/button/AddButton.tsx";
import ProjectTable from "./ProjectTable.tsx";
import ProjectFilter from "./ProjectFilter.tsx";

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
            <PageHeader text={'Projects Overview'}/>
            <Box sx={{ display: 'flex'}}>
                <AddButton text={'Create new project'}/>
            </Box>

            <Box sx={{ display: 'flex'}}>
                <ProjectFilter />
            </Box>

            <ContentCard>
                <Box sx={{ display: 'flex', marginTop: 5, marginBottom: 10}}>
                    <ProjectTable />
                </Box>
            </ContentCard>
        </Box>
    );
};

export default ProjectList;