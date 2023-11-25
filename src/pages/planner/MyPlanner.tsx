import {useForm} from "react-hook-form";
import {Box, Button} from "@mui/material";
import {SxProps, Theme} from "@mui/material";
import ContentCard from "../../components/layout/ContentCard.tsx";
import MyPlannerFilter from "./MyPlannerFilter.tsx";
import {useTypeSafeTranslation} from "../../components/inputFields/hooks/useTypeSafeTranslation.tsx";
import {useModal} from "@ebay/nice-modal-react";
import AddPlanDialog from "./AddPlanDialog.tsx";
import { Scheduler } from "@aldabil/react-scheduler";
import {useEffect, useState} from "react";

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
    const [editable, setEditable] = useState(true);

    const closeMonth = () => {
        setEditable(!editable);
    };

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

    const EVENTS = [
        {
            event_id: 6,
            title: "Bproject",
            projectId: "Bproject",
            description: "",
            start: new Date("2023 10 2 11:00"),
            end: new Date("2023 10 2 12:00")
        },
        {
            event_id: 7,
            title: "Aproject",
            projectId: "Aproject",
            description: "",
            start: new Date("2023 11 1 12:00"),
            end: new Date("2023 11 1 13:00")
        },
        {
            event_id: 8,
            title: "Bproject",
            projectId: "Bproject",
            description: "",
            start: new Date("2023 11 1 13:00"),
            end: new Date("2023 11 1 14:00")
        },
        {
            event_id: 9,
            title: "Bproject",
            projectId: "Bproject",
            description: "",
            start: new Date("2023 11 5 16:00"),
            end: new Date("2023 11 5 17:00")
        },
        {
            event_id: 10,
            title: "Aproject",
            projectId: "Aproject",
            description: "",
            start: new Date("2023 5 6  15:00"),
            end: new Date("2023 5 6 16:00")
        },
        {
            event_id: 11,
            title: "Aproject",
            projectId: "Aproject",
            description: "",
            start: new Date("2023 11 6 14:00"),
            end: new Date("2023 11 6 15:00")
        }
    ];

    useEffect(() => {

    }, [editable]);

    //TODO: on backend closing project, reopen project????????

    return (
        <Box>
            <Box sx={{ display: 'flex'}}>
                <MyPlannerFilter />
            </Box>

            <ContentCard>
                <Button sx={saveTitleStyle} onClick={openAddPlanDialog}>
                    {t('TEXT.ADD_LOG')}
                </Button>
                <Button sx={saveTitleStyle} onClick={closeMonth} data-testid='close-button'>
                    {t('TEXT.CLOSE_MONTH')}
                </Button>
                <Scheduler
                    height={500}
                    deletable={true}
                    view="month"
                    events={EVENTS}
                    hourFormat={'24'}
                    editable={editable}
                    draggable={false}
                    selectedDate={new Date(2023, 11, 20)}
                    data-testid='scheduler'
                    fields={[
                        {
                            name: "projectId",
                            type: "select",
                            // Should provide options with type:"select"
                            options: [
                                { id: 1, text: "Aproject", value: 1 },
                                { id: 2, text: "Bproject", value: 2 }
                            ],
                            config: { label: "Project", required: true, errMsg: "Select a project" }
                        },
                        {
                            name: "description",
                            type: "input",
                            default: "Add description...",
                            config: {
                                label: "Details",
                                multiline: true,
                                rows: 4
                            }
                        },
                        {
                            name: "start",
                            type: "date",
                            config: {
                                label: "Start Date",
                                md: 6,
                                type: "datetime"
                            }
                        },
                        {
                            name: "end",
                            type: "date",
                            config: {
                                label: "End Date",
                                md: 6,
                                type: "datetime"
                            }
                        }
                    ]}
                     week={{
                       weekDays: [0, 1, 2, 3, 4, 5, 6],
                       weekStartOn: 1,
                       startHour: 0,
                       endHour: 24,
                       step: 30,
                       cellRenderer: ({ height, start, onClick, ...props }) => {
                         // Fake some condition up
                         const hour = start.getHours();
                         const disabled = hour === 14;
                         const restProps = disabled ? {} : props;
                         return (
                             <Button
                                 style={{
                                     height: "100%",
                                     width: 150,
                                     background: disabled ? "#eee" : "transparent",
                                     cursor: disabled ? "not-allowed" : "pointer"
                                 }}
                                 onClick={() => {
                                     if (disabled) {
                                         return alert("Opss");
                                     }
                                     onClick();
                                 }}
                                 disableRipple={disabled}
                                 // disabled={disabled}
                                 {...restProps}
                             />
                         );
                       }
                     }}
                    month={{
                        weekDays: [0, 1, 2, 3, 4, 5, 6],
                        weekStartOn: 1,
                        startHour: 0,
                        endHour: 24,
                        cellRenderer: ({ height, start, onClick, ...props }) => {
                            // Fake some condition up
                            const hour = start.getHours();
                            const disabled = hour === 14;
                            const restProps = disabled ? {} : props;
                            return (
                                <Button
                                    style={{
                                        height: "100%",
                                        width: 150,
                                        background: disabled ? "#eee" : "transparent",
                                        cursor: disabled ? "not-allowed" : "pointer"
                                    }}
                                    onClick={() => {
                                        if (disabled) {
                                            return alert("Opss");
                                        }
                                        onClick();
                                    }}
                                    disableRipple={disabled}
                                    // disabled={disabled}
                                    {...restProps}
                                />
                            );
                        }
                    }}
                />
            </ContentCard>
        </Box>
    );
};


export default MyPlanner;