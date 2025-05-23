// Copyright (C) 2022-2025 Intel Corporation
// LIMITED EDGE SOFTWARE DISTRIBUTION LICENSE

import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { NOTIFICATION_TYPE } from '../../../notification/notification-toast/notification-type.enum';
import { useNotification } from '../../../notification/notification.component';
import { useApplicationServices } from '../../services/application-services-provider.component';
import { getErrorMessage } from '../../services/utils';
import { ProjectIdentifier } from '../core.interface';
import { ProjectExport } from '../project.interface';

interface UseExportProject {
    exportProjectMutation: UseMutationResult<ProjectExport, AxiosError, ProjectIdentifier>;
}

export const DOWNLOAD_STATUS_ERROR = 'Project was not downloaded due to an error.';

export const useExportProject = (): UseExportProject => {
    const { addNotification } = useNotification();
    const service = useApplicationServices().projectService;

    const exportProjectMutation = useMutation<ProjectExport, AxiosError, ProjectIdentifier>({
        mutationFn: service.exportProject,
        onError: (error: AxiosError) => {
            addNotification({ message: getErrorMessage(error), type: NOTIFICATION_TYPE.ERROR });
        },
    });

    return { exportProjectMutation };
};
