import { useSignOut } from '@nhost/react'
import { useUserData } from '@nhost/react'
import { gql, useQuery } from '@apollo/client'
import { useUserId } from '@nhost/react'

const GET_USER_QUERY = gql`
  query GetUser($id: uuid!) {
    user(id: $id) {
      id
      email
      displayName
      metadata
      avatarUrl
    }
  }
`

const Layout = () => {
  const id = useUserId()
  const { loading, error, data } = useQuery(GET_USER_QUERY, {
    variables: { id },
    skip: !id
  })
  const user = data?.user
  const { signOut } = useSignOut()
  // const user = useUserData()
  const menuItems = [
    //..
    {
      label: 'Logout',
      onClick: signOut,
      icon: LogoutIcon
    }
  ]
  return (
    <div>
      <header>{/* ... */}</header>

      <main className={styles.main}>
        <div className={styles['main-container']}>
          {error ? (
            <p>Something went wrong. Try to refresh the page.</p>
          ) : !loading ? (
            <Outlet context={{ user }} />
          ) : null}
        </div>
      </main>
    </div>
  )
  //...
}