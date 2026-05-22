            <form onSubmit={handleUpdateProfile}>
                <input
                type='text'
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder='Name'
                />
                <input
                type='email'
                disabled={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='email'
                />
                <button type='submit'>Update Profile</button>
                <div>
                    <button type='button' onClick={handleDeleteAccount}>Delete Account</button>
                </div>

            </form>