import type { UserProfile } from "../types/types";


type Props = {
    profile: UserProfile;
    user: any;
};

const ProfileInfo = ({profile, user}: Props) => {

    if (!user) return null; 

    return (
        <div>
            <h2>{user.displayName}</h2>
            <p>{user.email}</p>
            <p>{profile.dateOfBirth}</p>
            {profile.address ? (
                <div>
                    <p>{profile.address?.street}</p>
                    <p>{profile.address?.city}</p>
                    <p>{profile.address?.state}</p>
                </div>
                ) : (
                <p>No address added yet</p>
                )}
        </div>
    )
}

export default ProfileInfo;