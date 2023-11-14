import {Box} from "@mui/material";
import {useForm} from "react-hook-form";
import ContentCard from "../../components/layout/ContentCard.tsx";
import PageHeader from "../../components/text/PageHeader.tsx";
import AddButton from "../../components/button/AddButton.tsx";
import ProjectTable from "../projects/ProjectTable.tsx";
import UserFilter from "./UserFilter.tsx";

const UserList = () => {
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
            <PageHeader text={'Employees'}/>

            <Box sx={{ display: 'flex'}}>
                <UserFilter />
            </Box>

            <ContentCard>
                <Box sx={{ display: 'flex', marginTop: 5, marginBottom: 10}}>
                    <ProjectTable />
                </Box>
            </ContentCard>
        </Box>
    );
};


export default UserList;