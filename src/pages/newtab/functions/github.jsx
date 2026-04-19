import React, { useState, useEffect } from 'react';

import "@material/web/button/outlined-button";
import "@material/web/divider/divider";
import "@material/web/progress/circular-progress";

function Github() {
  const [userData, setUserData] = useState(null);
  const [reposData, setReposData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const username = 'BlockHaity';
  const repositories = [
    { owner: 'BlueArchiveArisHelper', name: 'BAAH' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 获取用户信息
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        if (!userRes.ok) throw new Error('Failed to fetch user data');
        const userData = await userRes.json();
        setUserData(userData);

        // 为每个仓库获取 PRs 和 Issues
        const reposData = {};

        for (const repo of repositories) {
          const [prsRes, issuesRes] = await Promise.all([
            fetch(`https://api.github.com/repos/${repo.owner}/${repo.name}/pulls?state=open&sort=created&direction=desc`),
            fetch(`https://api.github.com/repos/${repo.owner}/${repo.name}/issues?state=open&sort=created&direction=desc`)
          ]);

          reposData[`${repo.owner}/${repo.name}`] = {
            prs: prsRes.ok ? await prsRes.json() : [],
            issues: []
          };

          if (issuesRes.ok) {
            const issuesData = await issuesRes.json();
            const pureIssues = issuesData.filter(issue => !issue.pull_request);
            reposData[`${repo.owner}/${repo.name}`].issues = pureIssues;
          }
        }

        setReposData(reposData);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getContrastColor = (hexcolor) => {
    const r = parseInt(hexcolor.substr(0, 2), 16);
    const g = parseInt(hexcolor.substr(2, 2), 16);
    const b = parseInt(hexcolor.substr(4, 2), 16);
    const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (brightness > 125) ? '#000000' : '#FFFFFF';
  };

  if (loading) {
    return (
      <div style={{ width: '100%', padding: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
        <md-circular-progress indeterminate></md-circular-progress>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ width: '100%', padding: '16px' }}>
        <p style={{ fontSize: '16px', color: '#ff4d4f' }}>
          错误: {error}
        </p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', padding: '16px' }}>
      {userData && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <img
            src={userData.avatar_url}
            alt={userData.login}
            style={{ width: '64px', height: '64px', borderRadius: '50%' }}
          />
          <div>
            <h3 style={{ color: '#e2e2e9', margin: 0 }}>
              {userData.name || userData.login}
            </h3>
            <p style={{ color: '#c4c6d0', margin: '4px 0 0 0' }}>
              @{userData.login}
            </p>
            {userData.bio && (
              <p style={{ color: '#c4c6d0', marginTop: '4px', margin: '4px 0 0 0' }}>
                {userData.bio}
              </p>
            )}
          </div>
          <md-outlined-button
            style={{ '--md-outlined-button-label-text-color': '#a9c7ff' }}
            onClick={() => window.open(userData.html_url, '_blank')}
          >
            查看 GitHub
          </md-outlined-button>
        </div>
      )}

      <md-divider style={{ '--md-divider-color': 'rgba(142, 144, 153, 0.5)', marginBottom: '16px' }}></md-divider>

      {repositories.map((repo, repoIndex) => {
        const repoKey = `${repo.owner}/${repo.name}`;
        const repoInfo = reposData[repoKey] || { prs: [], issues: [] };

        return (
          <div key={repoKey} style={{ marginBottom: '24px' }}>
            <h3 style={{ color: '#e2e2e9', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg fill="#FFFFFF" viewBox="0 0 16 16" width="18" height="18">
                <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.25.25 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path>
              </svg>
              {repo.owner}/{repo.name}
            </h3>

            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ color: '#e2e2e9', margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg fill="#FFFFFF" viewBox="0 0 16 16" width="16" height="16">
                  <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z"></path>
                </svg>
                开启的 Pull Requests
              </h4>
              {repoInfo.prs.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {repoInfo.prs.map((pr, index) => (
                    <div
                      key={pr.id}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        animation: `fadeIn 0.3s ease ${0.1 + index * 0.1}s both`
                      }}
                    >
                      <a
                        href={pr.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#a9c7ff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}
                      >
                        #{pr.number} {pr.title}
                      </a>
                      <div style={{ display: 'flex', gap: '12px', fontSize: '12px' }}>
                        <span style={{ color: '#c4c6d0' }}>作者: {pr.user.login}</span>
                        <span style={{ color: pr.draft ? '#c4c6d0' : '#4caf50' }}>
                          {pr.draft ? '草稿' : '开启'}
                        </span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#c4c6d0' }}>
                        创建于: {new Date(pr.created_at).toLocaleString('zh-CN')}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: '#c4c6d0', margin: 0 }}>没有找到开启的 Pull Requests</p>
              )}
            </div>

            <div>
              <h4 style={{ color: '#e2e2e9', margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg fill="#FFFFFF" viewBox="0 0 16 16" width="16" height="16">
                  <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                  <path fillRule="evenodd" d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"></path>
                </svg>
                开启的 Issues
              </h4>
              {repoInfo.issues.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {repoInfo.issues.map((issue, index) => (
                    <div
                      key={issue.id}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        animation: `fadeIn 0.3s ease ${0.1 + index * 0.1}s both`
                      }}
                    >
                      <a
                        href={issue.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#e2e2e9', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}
                      >
                        #{issue.number} {issue.title}
                      </a>
                      <div style={{ display: 'flex', gap: '12px', fontSize: '12px' }}>
                        <span style={{ color: '#c4c6d0' }}>作者: {issue.user.login}</span>
                        <span style={{ color: '#4caf50' }}>开启</span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#c4c6d0' }}>
                        创建于: {new Date(issue.created_at).toLocaleString('zh-CN')}
                        <span style={{ marginLeft: '10px' }}>评论数: {issue.comments}</span>
                      </div>
                      {issue.labels && issue.labels.length > 0 && (
                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '4px' }}>
                          {issue.labels.map(label => (
                            <span
                              key={label.id}
                              style={{
                                backgroundColor: `#${label.color}`,
                                color: getContrastColor(label.color),
                                padding: '2px 8px',
                                borderRadius: '12px',
                                fontSize: '10px'
                              }}
                            >
                              {label.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: '#c4c6d0', margin: 0 }}>没有找到开启的 Issues</p>
              )}
            </div>

            {repoIndex < repositories.length - 1 && (
              <md-divider style={{ '--md-divider-color': 'rgba(142, 144, 153, 0.5)', marginTop: '24px' }}></md-divider>
            )}
          </div>
        );
      })}

      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}

export default Github;