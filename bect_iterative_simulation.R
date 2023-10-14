library(ggplot2)


# Bayesian update function for continuous evidence
bayesian_update <- function(alpha_prior, beta_prior, evidence) {
  
  # Bayesian update
  alpha_posterior = alpha_prior + evidence
  beta_posterior = beta_prior + (1 - evidence)
  
  return(list(alpha = alpha_posterior, beta = beta_posterior))
}

# Function to run iterative Bayesian updates for given evidence
run_simulation <- function(initial_belief, evidence) {
  # Initial alpha and beta based on belief
  alpha_prior = initial_belief * 100
  beta_prior = (1 - initial_belief) * 100
  
  for (i in 1:length(evidence)) {
    updated_beliefs = bayesian_update(alpha_prior, beta_prior, evidence[i])
    alpha_prior = updated_beliefs$alpha
    beta_prior = updated_beliefs$beta
  }
  
  # Compute mean belief after evidence
  posterior_belief = alpha_prior / (alpha_prior + beta_prior)
  return(posterior_belief)
}

################CHANGE DISTRUBUTION FOR PERSUASIVENESS
generate_evidence <- function(size, ratio_confirm) {
  confirm_count <- round(size * ratio_confirm)
  disconfirm_count <- size - confirm_count
  
  # Generate samples for confirm_count
  mean_confirm <- 0.6
  std_dev_confirm <- 0.05
  confirm_samples <- rnorm(confirm_count, mean_confirm, std_dev_confirm)
  confirm_samples <- pmin(pmax(confirm_samples, 0.5), 1)  # Truncate values to [0.5, 1]
  
  # Generate samples for disconfirm_count with mean of 0.2
  mean_disconfirm <- 0.4
  std_dev_disconfirm <- 0.05
  disconfirm_samples <- rnorm(disconfirm_count, mean_disconfirm, std_dev_disconfirm)
  disconfirm_samples <- pmin(pmax(disconfirm_samples, 0), 0.5)  # Truncate values to [0, 0.5]
  
  return(sample(c(confirm_samples, disconfirm_samples)))
}

# Generate evidence sequences
#generate_evidence <- function(size, ratio_confirm) {
#  confirm_count = round(size * ratio_confirm)
#  disconfirm_count = size - confirm_count
#  return(sample(c(runif(confirm_count, 0.5, 1), runif(disconfirm_count, 0, 0.5))))
#}

prior_values = seq(0, 1, by=0.1)
sizes = seq(10, 1000, by=10)
ratios = seq(0, 1, by=0.1)


# Create an empty dataframe to store results
results_df = data.frame()

# Run simulations
for (prior in prior_values) {
  for (size in sizes) {
    for (ratio in ratios) {
      evidence = generate_evidence(size, ratio)
      posterior = run_simulation(prior, evidence)
      
      # Store results in dataframe
      results_df = rbind(results_df, c(prior, size, ratio, posterior))
    }
  }
}

# Name columns of the dataframe
colnames(results_df) = c("Prior", "Size", "Ratio", "Posterior")

# Filter dataframe to include only desired facets for size
facets = c(0.1, 0.3, 0.5, 0.7, 0.9)
filtered_df = results_df[results_df$Size %in% (1000 * facets),]

# Plot
heatmap_plot = ggplot(filtered_df, aes(x=Prior, y=Ratio, fill=Posterior)) +
  geom_tile() +
  facet_wrap(~ Size, scales = "free") +
  scale_x_continuous(expand = c(0, 0)) +   
  scale_y_continuous(expand = c(0, 0)) +  
  scale_fill_gradient2(low="red", mid="white", high="blue", midpoint=0.5) +
  labs(title="Belief Update Heatmap", x="Initial Belief", y="Confirmatory Ratio")+
  theme_bw()

# Display plot
print(heatmap_plot)
