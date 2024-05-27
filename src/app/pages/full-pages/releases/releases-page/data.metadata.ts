import {Header} from '../../../../shared/interfaces/table.metadata';

export const HEADERS: Header[] = [
    {
        title: 'Type',
        field: '',
        sort: false,
        sortBy: null,
    },
    {
        title: 'Releases',
        field: '',
        sort: false,
        sortBy: null,
    },
    {
        title: 'Number of tracks',
        field: '',
        sort: false,
        sortBy: null,
    },
    {
        title: 'UPC/EAN',
        field: '',
        sort: false,
        sortBy: null,
    },
    {
        title: 'Date added',
        field: '',
        sort: false,
        sortBy: null,
    },
    {
        title: 'Release Date',
        field: '',
        sort: false,
        sortBy: null,
    },
    {
        title: 'Status',
        field: '',
        sort: false,
        sortBy: null,
        type: 'badge'
    },
    {
        title: '',
        field: '',
        sort: false,
        sortBy: null,
        type: 'action'
    },
];

export const STATUSES = [
    {
        label: 'Changes Needed',
        value: 'CHANGES_NEEDED'
    },
    {
        label: 'Pending Takedown',
        value: 'PENDING_TAKE_DOWN'
    },
    {
        label: 'Draft',
        value: 'DRAFT'
    },
    {
        label: 'Pending',
        value: 'PENDING'
    },
    {
        label: 'Approved',
        value: 'APPROVED'
    },
    {
        label: 'Released',
        value: 'RELEASED'
    },
    {
        label: 'Rejected',
        value: 'REJECTED'
    },
    {
        label: 'Taken Down',
        value: 'TAKEN_DOWN'
    },
];
