const ENV = {
    GitHubToken: process.env.GitHubToken,
    FromRepo: process.env.FromRepo,
    ToRepo: process.env.ToRepo,
    DeleteAfterClone: Boolean(process.env.DeleteAfterClone) ?? false
}

export default ENV;