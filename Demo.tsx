import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

const MenuItems = ({ map }) => {
  console.log('Rendering MenuItems with map:', map);
  return [
    ...Object.entries(map).flatMap(([organizationId, organization]) => {
      const hasBranches =
        organization.branches && Object.keys(organization.branches).length > 0;

      let subItems;
      if (hasBranches) {
        subItems = Object.entries(organization.branches).map(
          ([branchId, branchName]) => (
            <MenuItem
              key={`${organizationId}-${branchId}`}
              value={`${organizationId}-${branchId}`}
            >
              <Typography sx={{ ml: 1 }}>{branchName}</Typography>
            </MenuItem>
          )
        );
      } else {
        subItems = [
          <MenuItem key={`${organizationId}`} value={organizationId}>
            {organization.name}
          </MenuItem>,
        ];
      }

      return [
        hasBranches && [
          <ListSubheader key={`header-${organizationId}`}>
            <Typography>{organization.name}</Typography>
          </ListSubheader>,
        ],
        ...subItems,
      ];
    }),
  ];
};

const OrganizationSelect = ({ map, label, id, value, onChange }) => {
  const handleChange = (event) => {
    const newValue = event.target.value;
    console.log(`${label} changed:`, newValue);
    onChange(newValue);
  };

  const renderValue = (value) => {
    if (!value) return '';
    const [organizationId, branchId] = value.split('-');
    const organization = map[organizationId];
    if (!organization) return '';
    if (branchId) {
      return `${organization.name} - ${organization.branches[branchId]}`;
    }
    return organization.name;
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <Select
          value={value}
          id={id}
          label={label}
          renderValue={renderValue}
          onChange={handleChange}
          displayEmpty={false}
        >
          <MenuItems map={map} />
        </Select>
      </FormControl>
      <Typography component="code">
        {label}: {renderValue(value)}
      </Typography>
    </div>
  );
};

export default function GroupedSelect() {
  const [branchLevelValue, setBranchLevelValue] = React.useState('');
  const [orgLevelValue, setOrgLevelValue] = React.useState('');

  const BranchLevelUser = {
    '400c66a1-8326-4a5b-a6ec-e871cb80c3f2': {
      name: 'Weissnat Group',
    },
    '42f58fc8-ea41-432a-ba6f-d9c1beb9ad74': {
      name: 'Vandervort Group',
      branches: {
        '1bff954b-f9e8-43ac-b99c-a9e56f4d05a9': 'Gibsonbury',
        '02ae2294-aa5b-4b69-8be7-c7fc0e09e8e0': 'East Moisesbury',
      },
    },
  };

  const OrganizationLevelUser = {
    '400c66a1-8326-4a5b-a6ec-e871cb80c3f2': {
      name: 'Price Group',
    },
    '42f58fc8-ea41-432a-ba6f-d9c1beb9ad74': {
      name: 'Durgan, Haag and Konopelski',
    },
  };

  return (
    <div>
      <OrganizationSelect
        map={BranchLevelUser}
        label="Organization - Branch"
        id="organization-branch"
        value={branchLevelValue}
        onChange={setBranchLevelValue}
      />
      <OrganizationSelect
        map={OrganizationLevelUser}
        label="Organization"
        id="organization"
        value={orgLevelValue}
        onChange={setOrgLevelValue}
      />
    </div>
  );
}
