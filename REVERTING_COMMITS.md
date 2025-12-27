# How to Revert to a Previous Commit

This guide explains different methods to revert to a previous commit in Git. Each method has different use cases and implications.

## Before You Start

1. **View your commit history:**
   ```bash
   git log --oneline
   ```
   This shows your recent commits with their commit hashes.

2. **Check your current status:**
   ```bash
   git status
   ```
   Ensure you understand what changes are currently in your working directory.

## Method 1: Revert (Safe - Creates New Commit)

**Use when:** You want to undo changes but keep the commit history intact.

**Command:**
```bash
git revert <commit-hash>
```

**Example:**
```bash
git revert 1df112f
```

**What it does:**
- Creates a new commit that undoes the changes from the specified commit
- Preserves the complete history
- Safe for shared/public branches
- Can revert multiple commits: `git revert <commit1> <commit2>`

**Pros:**
- ✅ Safe for collaboration
- ✅ Maintains complete history
- ✅ Can be pushed to shared branches without issues

**Cons:**
- ❌ Creates additional commits in history
- ❌ Can be confusing with many reverts

## Method 2: Reset --soft (Moves HEAD, Keeps Changes Staged)

**Use when:** You want to undo commits but keep your changes ready to commit again.

**Command:**
```bash
git reset --soft <commit-hash>
```

**Example:**
```bash
git reset --soft HEAD~1  # Goes back 1 commit
git reset --soft 1df112f # Goes back to specific commit
```

**What it does:**
- Moves HEAD to the specified commit
- Keeps all changes from undone commits in the staging area
- Working directory unchanged

**Pros:**
- ✅ Keeps all your changes
- ✅ Changes are already staged
- ✅ Easy to modify and recommit

**Cons:**
- ⚠️ Requires force push if already pushed: `git push --force`
- ⚠️ Can cause issues for collaborators

## Method 3: Reset --mixed (Moves HEAD, Keeps Changes Unstaged)

**Use when:** You want to undo commits and review changes before re-staging them.

**Command:**
```bash
git reset <commit-hash>
# or
git reset --mixed <commit-hash>
```

**Example:**
```bash
git reset HEAD~1
git reset 1df112f
```

**What it does:**
- Moves HEAD to the specified commit
- Keeps all changes in the working directory (unstaged)
- Clears the staging area

**Pros:**
- ✅ Keeps all your changes
- ✅ Allows you to selectively stage changes
- ✅ Good for reorganizing commits

**Cons:**
- ⚠️ Requires force push if already pushed: `git push --force`
- ⚠️ Can cause issues for collaborators

## Method 4: Reset --hard (Destructive - Discards Changes)

**Use when:** You want to completely discard all changes and go back to a previous state.

**⚠️ WARNING:** This permanently deletes uncommitted changes!

**Command:**
```bash
git reset --hard <commit-hash>
```

**Example:**
```bash
git reset --hard HEAD~1  # Goes back 1 commit, discards all changes
git reset --hard 1df112f # Goes back to specific commit
```

**What it does:**
- Moves HEAD to the specified commit
- Discards ALL changes in working directory and staging area
- Makes your repository exactly match the specified commit

**Pros:**
- ✅ Clean slate - repository matches target commit exactly
- ✅ Simple and straightforward

**Cons:**
- ⚠️ PERMANENTLY DELETES uncommitted changes
- ⚠️ Requires force push if already pushed: `git push --force`
- ⚠️ Can cause major issues for collaborators
- ⚠️ Cannot be undone (unless you know the commit hash)

## Method 5: Checkout (Temporary View)

**Use when:** You want to temporarily view or test an old commit without changing your branch.

**Command:**
```bash
git checkout <commit-hash>
```

**Example:**
```bash
git checkout 1df112f
```

**What it does:**
- Enters "detached HEAD" state
- Allows you to view and test old code
- Doesn't modify your branch

**To return to your branch:**
```bash
git checkout main  # or your branch name
```

**Pros:**
- ✅ Non-destructive
- ✅ Good for testing/viewing old code
- ✅ Easy to return to current state

**Cons:**
- ❌ Can be confusing (detached HEAD state)
- ❌ Commits made here need to be saved to a branch

## Common Scenarios

### Scenario 1: Undo the Last Commit (Keep Changes)
```bash
git reset --soft HEAD~1
```

### Scenario 2: Undo the Last Commit (Discard Changes)
```bash
git reset --hard HEAD~1
```

### Scenario 3: Undo a Commit in Shared Branch
```bash
git revert <commit-hash>
git push
```

### Scenario 4: Go Back Multiple Commits (Keep Changes)
```bash
git reset --soft HEAD~3  # Goes back 3 commits
```

### Scenario 5: Temporarily View Old Code
```bash
git checkout <commit-hash>
# Look around, test things
git checkout main  # Return to main branch
```

## Important Notes

### About Force Push
- Use `git push --force` or `git push --force-with-lease` after reset commands
- **Never force push to shared/public branches without team coordination**
- `--force-with-lease` is safer as it checks if others have pushed

### Recovering from Mistakes
If you made a mistake, you might be able to recover:
```bash
git reflog  # Shows all recent HEAD positions
git reset --hard <commit-hash-from-reflog>
```

### HEAD Notation
- `HEAD` = current commit
- `HEAD~1` = 1 commit before HEAD
- `HEAD~2` = 2 commits before HEAD
- `HEAD~n` = n commits before HEAD

## Best Practices

1. **Always commit or stash changes** before reverting
2. **Use `git revert` for public/shared branches** to avoid disrupting collaborators
3. **Use `git reset` for local branches** that haven't been pushed
4. **Communicate with your team** before force pushing
5. **Create a backup branch** before destructive operations:
   ```bash
   git branch backup-branch-name
   ```

## Quick Reference Table

| Method | History | Changes | Staging | Safe for Shared Branches |
|--------|---------|---------|---------|-------------------------|
| `git revert` | Adds new commit | Reversed | Committed | ✅ Yes |
| `git reset --soft` | Moves HEAD | Kept | Staged | ❌ No |
| `git reset --mixed` | Moves HEAD | Kept | Unstaged | ❌ No |
| `git reset --hard` | Moves HEAD | Deleted | Deleted | ❌ No |
| `git checkout` | Unchanged | Temporary | Unchanged | ✅ Yes (view only) |

## Need Help?

- Check Git documentation: `git help revert` or `git help reset`
- View reflog for recovery: `git reflog`
- Ask your team before force pushing to shared branches
