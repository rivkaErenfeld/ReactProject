import { useState, useEffect, } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { SetUsers, SetUsersPost } from '../redux/action'
import api from '../api'
import { UserPost } from '../component/userPost'
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid'
import { CircularProgress, styled, Grid, Alert } from '@mui/material'

// Design of material components
const Container = styled('div')`
  display: flex;
  justify-content: space-between; 
  margin: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const GridItemStyled = styled(Grid)`
  width: 50%;
  text-align: center;
  margin-left: 1%;

  @media (max-width: 600px) {
    width: 100%;
    margin-left: 0;
  }
`;
const LoadingContainer = styled('div')`({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'

    @media (max-width: 600px) {
        height: '50vh'
      }
})`;

export const UserTable = () => {

    const dispatch = useDispatch();
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const users = useSelector((state) => state.user_details);

    // Retrieving the users and posts from the JSON file and placing them in state  
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await api.getUsers();
                dispatch(SetUsers(response));
            } catch (error) {
                <Alert severity="error">Error fetching users</Alert>
                console.error('Error fetching users', error);
            } finally {
                setLoading(false);
            }
            try {
                const response2 = await api.getUserPost();
                dispatch(SetUsersPost(response2));
            }
            catch (error) {
                <Alert severity="error">Error fetching user posts</Alert>
                console.error('Error fetching user posts', error);
            }
        };
        fetchData();
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'company', headerName: 'Company Name', width: 200, valueGetter: (params) => params.row.company.name },
    ];

    return <>
    {/* A loading indicator */}
        {loading && (
            <LoadingContainer>
                <CircularProgress />
            </LoadingContainer>
        )}
        <Container>
            <DataGrid
                rows={users}
                columns={columns}
                pageSize={3}
                onRowClick={(params) => {
                    setSelectedUser(params.row);
                }}
                components={{
                    Toolbar: GridToolbarQuickFilter,
                }}
            />
            {
                selectedUser ? (
                    <GridItemStyled>
                        <UserPost user={selectedUser} />
                    </GridItemStyled>
                ) : (
                    <GridItemStyled>Please select a user to view their posts.</GridItemStyled>
                )
            }
        </Container>
    </>
};
