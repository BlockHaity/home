import React, { useState, useEffect } from 'react';

function Github() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const response = await fetch('https://api.github.com/users/BlockHaity');
        if (!response.ok) {
          throw new Error('Failed to fetch Github data');
        }
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGithubData();
  }, []);

  if (loading) {
    return <div>Loading Github information...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>No Github data found</div>;
  }

  return (
    <div style={{ padding: '20px', color: 'var(--md-sys-color-on-surface)' }}>
      <h3 style={{ color: 'var(--md-sys-color-primary)' }}>Github Profile</h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
        <img 
          src={userData.avatar_url} 
          alt={userData.login} 
          style={{ width: '100px', height: '100px', borderRadius: '50%' }}
        />
        <div>
          <h4 style={{ color: 'var(--md-sys-color-on-surface)' }}>{userData.name}</h4>
          <p style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>{userData.login}</p>
          <p style={{ color: 'var(--md-sys-color-on-surface)' }}>{userData.bio}</p>
          <a 
            href={userData.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: 'var(--md-sys-color-primary)', textDecoration: 'none' }}
          >
            View on Github
          </a>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
        <div style={{ 
          border: '1px solid var(--md-sys-color-outline-variant)', 
          borderRadius: '30px', 
          padding: '15px', 
          textAlign: 'center',
          backgroundColor: 'var(--md-sys-color-surface-container)'
        }}>
          <h5 style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>Repositories</h5>
          <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--md-sys-color-on-surface)' }}>{userData.public_repos}</p>
        </div>
        <div style={{ 
          border: '1px solid var(--md-sys-color-outline-variant)', 
          borderRadius: '30px', 
          padding: '15px', 
          textAlign: 'center',
          backgroundColor: 'var(--md-sys-color-surface-container)'
        }}>
          <h5 style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>Followers</h5>
          <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--md-sys-color-on-surface)' }}>{userData.followers}</p>
        </div>
        <div style={{ 
          border: '1px solid var(--md-sys-color-outline-variant)', 
          borderRadius: '30px', 
          padding: '15px', 
          textAlign: 'center',
          backgroundColor: 'var(--md-sys-color-surface-container)'
        }}>
          <h5 style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>Following</h5>
          <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--md-sys-color-on-surface)' }}>{userData.following}</p>
        </div>
      </div>
    </div>
  );
}

export default Github;