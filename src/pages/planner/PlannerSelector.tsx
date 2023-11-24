import ContentCard from "../../components/layout/ContentCard.tsx";
import MyPlannerCard from "../../components/layout/MyPlannerCard.tsx";
import EmployeesPlannerCard from "../../components/layout/EmployeesPlannerCard.tsx";
import {Box} from "@mui/material";
import { Link } from 'react-router-dom';
import {useTypeSafeTranslation} from "../../components/inputFields/hooks/useTypeSafeTranslation.tsx";

const PlannerSelector = () => {
    const { t } = useTypeSafeTranslation();

    return (
        <ContentCard>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 7, marginTop: 10}}>
                <Link style={{textDecoration: 'none'}} key={'my-planner'} to={'/my-planner'}>
                    <MyPlannerCard text={t('TEXT.MY_PLANNER')} data-testid='my-planner-card'/>
                </Link>
                <Link style={{textDecoration: 'none'}} key={'employees-planner'} to={'/employees-planner'}>
                    <EmployeesPlannerCard text={t('TEXT.MY_EMPLOYEES_PLANNER')} data-testid='employees-planner-card' />
                </Link>
            </Box>
        </ContentCard>
    );
};

export default PlannerSelector;